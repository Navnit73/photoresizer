import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { examPages } from "@/data/examPages";

export function ExamDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = Array.from(new Set(examPages.map(e => e.category)));

  return (
    <section className="w-full py-12 md:py-16 border-t border-border bg-card">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            State-Wise & Central Exam Photo Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the exact photo and signature resizing tools for your specific government, banking, state PSC, or entrance exam.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xl mx-auto mb-12 animate-fade-up">
          <div className="relative bg-background border border-border shadow-sm rounded-xl flex items-center p-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search className="w-5 h-5 text-muted-foreground ml-3 shrink-0" />
            <Input 
              type="text" 
              placeholder="Search by state, exam name, or organization (e.g., 'UPPSC', 'Bihar')..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 text-base h-11 w-full"
            />
          </div>
        </div>
        
        <div className="space-y-10">
          {categories.map(category => {
            // Filter exams for this category based on search query
            const examsForCategory = examPages.filter(e => {
              if (e.category !== category) return false;
              if (!searchQuery) return true;
              
              const q = searchQuery.toLowerCase();
              return (
                e.name.toLowerCase().includes(q) ||
                e.fullName.toLowerCase().includes(q) ||
                e.organization.toLowerCase().includes(q) ||
                e.category.toLowerCase().includes(q)
              );
            });

            // Hide the category entirely if no exams match the search
            if (examsForCategory.length === 0) return null;

            return (
              <div key={category} className="animate-fade-up">
                <h3 className="text-xl font-semibold text-primary mb-4 border-b border-border pb-2">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {examsForCategory.map(exam => (
                    <div 
                      key={exam.slug} 
                      className="flex flex-col space-y-1.5 p-3.5 rounded-xl bg-muted/30 hover:bg-muted border border-border transition-colors group"
                    >
                      <div className="font-semibold text-[15px] text-foreground truncate group-hover:text-primary transition-colors" title={exam.fullName}>
                        {exam.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate mb-1" title={exam.fullName}>
                        {exam.organization}
                      </div>
                      <div className="flex items-center gap-3 text-sm pt-1 mt-auto">
                        <Link 
                          to={`/${exam.slug}-photo-resizer`} 
                          className="text-primary hover:underline font-medium"
                        >
                          Photo Editor
                        </Link>
                        <span className="text-border">|</span>
                        <Link 
                          to={`/${exam.slug}-signature-resizer`} 
                          className="text-primary hover:underline font-medium"
                        >
                          Signature Editor
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Fallback if search returns nothing across all categories */}
          {searchQuery && !categories.some(c => 
            examPages.some(e => 
              e.category === c && (
                e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.category.toLowerCase().includes(searchQuery.toLowerCase())
              )
            )
          ) && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted text-muted-foreground mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No exams found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms.</p>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
