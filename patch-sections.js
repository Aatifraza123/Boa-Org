const fs = require("fs");

// NewsGallerySection
let news = fs.readFileSync("boa-connect/src/components/home/NewsGallerySection.tsx", "utf8");
news = news.replace("py-20 bg-white", "py-20 bg-gray-50/50");
news = news.replace("container max-w-7xl mx-auto px-4 sm:px-6", "container px-4 sm:px-6 mx-auto max-w-7xl");
news = news.replace("mb-12 md:mb-16", "mb-16 md:mb-20");
news = news.replace(/rounded-3xl border border-gray-100 overflow-hidden shadow-\[0_4px_20px_rgb\(0,0,0,0\.03\)\] hover:shadow-\[0_8px_30px_rgb\(0,0,0,0\.08\)\] transform transition-all duration-300 hover:-translate-y-1/g, "rounded-2xl border border-gray-100 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300");
news = news.replace(
  'bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl font-bold uppercase tracking-widest text-sm shadow-[0_8px_20px_rgb(37,99,235,0.2)] hover:shadow-[0_10px_25px_rgb(37,99,235,0.3)] transition-all duration-300',
  'bg-[#09637E] hover:bg-[#088395] text-white px-6 py-6 text-base font-medium rounded-lg shadow-sm transition-all'
);
news = news.replace("py-20 bg-[#FAFBFF]", "py-20 bg-white");
news = news.replace(/bg-teal-200/g, "bg-blue-200");
news = news.replace(/text-teal-600/g, "text-blue-600");
news = news.replace(/text-teal-600">Highlights/g, 'text-blue-600">Highlights');
news = news.replace(/rounded-3xl shadow-\[0_4px_20px_rgb\(0,0,0,0\.04\)\] hover:shadow-\[0_12px_30px_rgb\(0,0,0,0\.1\)\]/g, "rounded-2xl shadow-md hover:shadow-lg");
news = news.replace(
  'bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 rounded-xl font-bold uppercase tracking-widest text-sm shadow-[0_8px_20px_rgb(13,148,136,0.2)] hover:shadow-[0_10px_25px_rgb(13,148,136,0.3)] transition-all duration-300',
  'bg-[#09637E] hover:bg-[#088395] text-white px-6 py-6 text-base font-medium rounded-lg shadow-sm transition-all'
);
// Fix broken nested gallery grid
news = news.replace(
  `            <div className="grid grid-cols-1 md:grid-cols-3 mt-12 gap-3 md:gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">`,
  `            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">`
);
fs.writeFileSync("boa-connect/src/components/home/NewsGallerySection.tsx", news);

// TestimonialsSection
let test = fs.readFileSync("boa-connect/src/components/home/TestimonialsSection.tsx", "utf8");
test = test.replace("py-20 bg-[#FAFBFF]", "py-20 bg-gray-50/50");
test = test.replace("container max-w-7xl mx-auto px-4 sm:px-6", "container px-4 sm:px-6 mx-auto max-w-7xl");
test = test.replace(/rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-\[0_4px_20px_rgb\(0,0,0,0\.03\)\] hover:shadow-\[0_12px_30px_rgb\(0,0,0,0\.08\)\] transition-all duration-300 ease-in-out hover:-translate-y-1 relative group flex flex-col/g, "rounded-2xl border border-gray-100 p-8 shadow-md hover:shadow-lg transition-shadow duration-300 relative flex flex-col bg-white");
test = test.replace(/\s*<div className="absolute top-8 right-8 text-blue-50 group-hover:text-blue-100 transition-colors">\s*<Quote className="h-16 w-16 rotate-180" \/>\s*<\/div>\s*/g, "\n              ");
test = test.replace("text-gray-500 leading-relaxed text-base sm:text-lg relative z-10 flex-grow italic", "text-gray-600 leading-relaxed text-sm sm:text-base flex-grow");
test = test.replace("font-extrabold", "font-semibold");
fs.writeFileSync("boa-connect/src/components/home/TestimonialsSection.tsx", test);

console.log("sections patched");
