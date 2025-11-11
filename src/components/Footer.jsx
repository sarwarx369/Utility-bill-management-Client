import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <div className="font-bold text-xl">UBMS</div>
          <p className="text-sm text-gray-600 mt-1">
            Manage and pay your monthly utility bills securely.
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © {new Date().getFullYear()} UBMS
          </p>
        </div>
        <div className="flex gap-6">
          <div>
            <div className="font-semibold">Useful Links</div>
            <ul className="text-sm text-gray-600 mt-2">
              <li>Home</li>
              <li>Bills</li>
              <li>Profile</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold">Contact</div>
            <p className="text-sm text-gray-600 mt-2">support@ubms.local</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
