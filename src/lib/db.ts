/**
 * Simple file-based database for storing subscriber information
 * This is a basic implementation for tracking email signups
 * For production, consider using a proper database like Supabase or Firebase
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the subscribers database file
const DB_PATH = path.resolve(__dirname, '../../data/subscribers.json');

export interface Subscriber {
  email: string;
  name: string;
  source: string; // landing page identifier (e.g., 'meditation-bootcamp')
  timestamp: string;
  userAgent?: string;
  referrer?: string;
  convertKitStatus?: 'success' | 'error' | 'pending';
  convertKitError?: string;
}

/**
 * Initialize the database file if it doesn't exist
 */
function initDatabase(): void {
  const dir = path.dirname(DB_PATH);

  // Create data directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create database file if it doesn't exist
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }
}

/**
 * Read all subscribers from the database
 */
export function getSubscribers(): Subscriber[] {
  try {
    initDatabase();
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading subscribers:', error);
    return [];
  }
}

/**
 * Add a new subscriber to the database
 */
export function addSubscriber(subscriber: Subscriber): void {
  try {
    initDatabase();
    const subscribers = getSubscribers();
    subscribers.push(subscriber);
    fs.writeFileSync(DB_PATH, JSON.stringify(subscribers, null, 2));
  } catch (error) {
    console.error('Error adding subscriber:', error);
    throw new Error('Failed to save subscriber to database');
  }
}

/**
 * Check if an email already exists in the database
 */
export function emailExists(email: string): boolean {
  const subscribers = getSubscribers();
  return subscribers.some((sub) => sub.email.toLowerCase() === email.toLowerCase());
}

/**
 * Get subscribers by source (landing page)
 */
export function getSubscribersBySource(source: string): Subscriber[] {
  const subscribers = getSubscribers();
  return subscribers.filter((sub) => sub.source === source);
}

/**
 * Get subscription statistics
 */
export function getStats() {
  const subscribers = getSubscribers();
  const total = subscribers.length;
  const bySource = subscribers.reduce(
    (acc, sub) => {
      acc[sub.source] = (acc[sub.source] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const convertKitSuccess = subscribers.filter((sub) => sub.convertKitStatus === 'success').length;
  const convertKitError = subscribers.filter((sub) => sub.convertKitStatus === 'error').length;

  return {
    total,
    bySource,
    convertKit: {
      success: convertKitSuccess,
      error: convertKitError,
      pending: total - convertKitSuccess - convertKitError,
    },
  };
}
