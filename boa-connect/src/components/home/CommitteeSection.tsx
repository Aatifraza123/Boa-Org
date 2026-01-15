import { useState, useEffect } from 'react';

export function CommitteeSection() {
  const [committeeMembers, setCommitteeMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCommitteeMembers();
  }, []);

  const loadCommitteeMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/committee-members?page_type=home');
      const data = await response.json();
      if (data.success) {
        setCommitteeMembers(data.members || []);
      }
    } catch (error) {
      console.error('Failed to load committee members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-card">
        <div className="container flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  if (committeeMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-card">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Committee
          </h2>
          <p className="text-lg text-muted-foreground">
            Meet the dedicated team leading our organization
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 max-w-7xl mx-auto">
          {committeeMembers.map((member) => (
            <div key={member.id} className="text-center p-6 rounded-2xl border border-border bg-background hover:shadow-xl transition-all duration-300 w-full max-w-[200px]">
              {member.image_url ? (
                <img 
                  src={member.image_url} 
                  alt={member.name}
                  className="h-32 w-32 rounded-full mx-auto mb-4 object-cover border-3 border-primary/20 shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`h-32 w-32 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-lg ${member.image_url ? 'hidden' : ''}`}>
                {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
              </div>
              <h3 className="font-bold text-foreground text-base leading-tight mb-2">{member.name}</h3>
              <p className="text-primary font-semibold text-sm">{member.profession}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
