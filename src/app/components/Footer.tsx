'use client';
import React from 'react';



export default function Footer() {
    return (
      <footer className="bg-gray-200 text-black py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} AI Enhanced Expense Tracker. All rights reserved.
          </p>
          <p className="text-sm">
            Built with ❤️ using Next.js
          </p>
        </div>
      </footer>
    );
  }
  