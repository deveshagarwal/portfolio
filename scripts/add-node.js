#!/usr/bin/env node

/**
 * Script to add a new node to the constellation and create corresponding page
 *
 * Usage: node scripts/add-node.js <node-name> <icon-type>
 * Example: node scripts/add-node.js projects briefcase
 *
 * Available icons: briefcase, pen, book, film
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node scripts/add-node.js <node-name> [icon-type]');
  console.error('Example: node scripts/add-node.js projects briefcase');
  console.error('Available icons: briefcase, pen, book, film');
  process.exit(1);
}

const nodeName = args[0].toLowerCase();
const icon = args[1] || 'briefcase';
const label = nodeName.charAt(0).toUpperCase() + nodeName.slice(1);
const componentName = label;

// Validate icon
const validIcons = ['briefcase', 'pen', 'book', 'film'];
if (!validIcons.includes(icon)) {
  console.error(`Invalid icon: ${icon}`);
  console.error(`Available icons: ${validIcons.join(', ')}`);
  process.exit(1);
}

// Paths
const projectRoot = path.resolve(__dirname, '..');
const mapConfigPath = path.join(projectRoot, 'src/data/map-config.json');
const appDir = path.join(projectRoot, 'src/app', nodeName);
const componentDir = path.join(projectRoot, 'src/components/sections');
const componentPath = path.join(componentDir, `${componentName}.tsx`);
const pagePath = path.join(appDir, 'page.tsx');

// Check if node already exists
const mapConfig = JSON.parse(fs.readFileSync(mapConfigPath, 'utf8'));
if (mapConfig.nodes.find(n => n.id === nodeName)) {
  console.error(`Error: Node "${nodeName}" already exists in map-config.json`);
  process.exit(1);
}

// Generate random position around the center (avoiding other nodes)
const existingPositions = mapConfig.nodes.map(n => n.position);
let x, y, attempts = 0;
do {
  const angle = Math.random() * Math.PI * 2;
  const distance = 20 + Math.random() * 18;
  x = Math.round(50 + Math.cos(angle) * distance);
  y = Math.round(50 + Math.sin(angle) * distance);
  attempts++;

  // Check if too close to existing nodes
  const tooClose = existingPositions.some(pos => {
    const dist = Math.sqrt((pos.x - x) ** 2 + (pos.y - y) ** 2);
    return dist < 20;
  });

  if (!tooClose && x >= 10 && x <= 90 && y >= 10 && y <= 90) break;
} while (attempts < 100);

// Add node to map-config.json
const newNode = {
  id: nodeName,
  label: label,
  targetSection: `/${nodeName}`,
  position: { x, y },
  icon: icon
};

mapConfig.nodes.push(newNode);
mapConfig.connections.push({
  from: "center",
  to: nodeName
});

fs.writeFileSync(mapConfigPath, JSON.stringify(mapConfig, null, 2) + '\n');
console.log(`✓ Added node to map-config.json at position (${x}, ${y})`);

// Create component file
const componentContent = `"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ${componentName}() {
  return (
    <section id="${nodeName}" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading>${label}</SectionHeading>

          {/* Add your content here */}
          <div className="text-center text-white/90">
            <p>Content for ${label} section goes here.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
`;

if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

if (fs.existsSync(componentPath)) {
  console.warn(`⚠ Component already exists at ${componentPath}, skipping...`);
} else {
  fs.writeFileSync(componentPath, componentContent);
  console.log(`✓ Created component at src/components/sections/${componentName}.tsx`);
}

// Create page file
const pageContent = `"use client";

import { ${componentName} } from "@/components/sections/${componentName}";

export default function ${componentName}Page() {
  return (
    <main className="relative min-h-screen">
      <${componentName} />
    </main>
  );
}
`;

if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

if (fs.existsSync(pagePath)) {
  console.warn(`⚠ Page already exists at ${pagePath}, skipping...`);
} else {
  fs.writeFileSync(pagePath, pageContent);
  console.log(`✓ Created page at src/app/${nodeName}/page.tsx`);
}

console.log('\n✓ Successfully added new node!');
console.log(`\nNext steps:`);
console.log(`1. Edit src/components/sections/${componentName}.tsx to add your content`);
console.log(`2. The node will appear on the constellation automatically`);
console.log(`3. Restart your dev server to see the changes\n`);
