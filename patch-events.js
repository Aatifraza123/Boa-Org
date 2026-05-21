const fs = require("fs");

const eventsPath = "boa-connect/src/components/home/UpcomingEventsCarousel.tsx";
let events = fs.readFileSync(eventsPath, "utf8");

events = events.replace('py-16 bg-gray-50', 'py-20 bg-white');
events = events.replace(
  'container max-w-7xl mx-auto px-4',
  'container px-4 sm:px-6 mx-auto max-w-7xl'
);

const oldStart = events.indexOf('        <div className="mb-8">');
const oldEnd = events.indexOf('        {isLoading ?');
if (oldStart === -1 || oldEnd === -1) {
  console.error("markers not found");
  process.exit(1);
}

const header = `        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
            <div className="flex items-center gap-2 text-blue-600 font-bold tracking-[0.2em] text-xs md:text-sm uppercase">
              <Star className="h-4 w-4" />
              Upcoming Events {isLoading ? '(Loading...)' : \`(\${events.length} events)\`}
            </div>
            <div className="h-[2px] w-8 md:w-12 bg-blue-200"></div>
          </div>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl mx-auto">
            Stay informed about seminars, elections, and important announcements from Ophthalmic Association Of Bihar
          </p>
        </div>

`;

events = events.slice(0, oldStart) + header + events.slice(oldEnd);

events = events.replace(
  "import { Calendar, MapPin, FileText, ExternalLink, Clock, Vote, Briefcase } from 'lucide-react';",
  "import { Calendar, MapPin, ExternalLink, Clock, Vote, Briefcase, Star } from 'lucide-react';"
);

events = events.replace(
  'border border-gray-200 rounded-lg shadow-sm',
  'border border-gray-100 rounded-2xl shadow-md'
);

events = events.replace(
  'bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg h-11 px-6 text-sm transition-colors"\n                            style={{ fontFamily: \'Noto Sans, sans-serif\' }}',
  'bg-[#09637E] hover:bg-[#088395] text-white font-medium rounded-lg h-11 px-6 text-base transition-colors shadow-sm'
);

events = events.replace(/\n                            style=\{\{ fontFamily: 'Noto Sans, sans-serif' \}\}/g, '');

events = events.replace(
  'text-xl font-bold text-gray-900 leading-tight" style={{ fontFamily: \'Noto Sans, sans-serif\' }}',
  'text-xl font-semibold text-gray-900 leading-tight'
);

fs.writeFileSync(eventsPath, events);
console.log("patched");
