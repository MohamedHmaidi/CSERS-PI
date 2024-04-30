import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service'; 
import { Quiz } from '../quiz/quiz.model';
import { ActivatedRoute, Router } from '@angular/router';
import { faSort, faSortUp, faSortDown  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})

export class QuizzesComponent implements OnInit {
  quizzes: Quiz[] = []; // Declare a quizzes array to store fetched data
  filteredQuizzes: Quiz[] = [];
  searchText: string = ''; 

  faSort = faSort;  // Import the icons
faSortUp = faSortUp;
faSortDown = faSortDown;
sortIcon: any = this.faSort; // Initialize with faSort icon from Font Awesome 

sortColumn: string = ''; // Initialize with no sorting
sortDirection: 'asc' | 'desc' = 'asc';  // Start with ascending direction

  constructor(private quizService: QuizService, private router: Router, private route: ActivatedRoute) {} // Inject Router


  ngOnInit() {
    // Extract the trainingContentId from the route parameters
    this.route.queryParams.subscribe(params => {
      const trainingContentId = params['trainingContentId'];
      
      if (trainingContentId) {
        // Fetch quizzes by training content ID
        this.quizService.getQuizzesByTrainingContentId(Number(trainingContentId)).subscribe(quizzes => {
          this.quizzes = quizzes.map(quiz => ({ ...quiz, displayType: this.beautifyType(quiz.type) }));
          this.filteredQuizzes = this.quizzes; // Initialize filteredQuizzes
        });
      } else {
        // Fetch all quizzes
        this.quizService.getQuizzes().subscribe(quizzes => {
          this.quizzes = quizzes.map(quiz => ({ ...quiz, displayType: this.beautifyType(quiz.type) }));
          this.filteredQuizzes = this.quizzes; // Initialize filteredQuizzes
        });
      }
    });
  }



  sortBy(column: string) {
    // 1. Determine sorting direction
    if (this.sortColumn !== column) {
      this.sortColumn = column;
      this.sortDirection = 'asc';  // Default to ascending
    } else {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    }
  
    // 2. Perform sorting on the filteredQuizzes array
    this.filteredQuizzes.sort((a, b) => {
      if (column === 'passingScore') {
        return this.compareNumbers(a.passingScore, b.passingScore);
      } else if (column === 'createdDate') {
        return this.compareDates(a.createdDate, b.createdDate);
      } else {
        return 0; // Assuming other columns can't be sorted
      }
    });
  
    // 3. Update icon of the clicked th element
    if (this.sortDirection === 'desc') {
      this.sortIcon = faSortDown;
    } else {
      this.sortIcon = faSortUp;
    }
  }
  

// Helper functions 
compareNumbers(a: number, b: number) {
  if (this.sortDirection === 'asc') {
    return a - b;
  } else {
    return b - a;
  }
}

compareDates(a: string, b: string) {
 if (this.sortDirection === 'asc') {
   return a.localeCompare(b); // Compare as strings alphabetically
 } else {
   return b.localeCompare(a); 
 }
}






filterQuizzes() {
  const searchTerm = this.searchText.toLowerCase();
  this.filteredQuizzes = this.quizzes.filter(quiz => {
    return quiz.title.toLowerCase().includes(searchTerm) || 
           quiz.description.toLowerCase().includes(searchTerm) || 
           quiz.createdDate.toLowerCase().includes(searchTerm) ||
           quiz.passingScore.toString().includes(searchTerm) ||
           this.beautifyType(quiz.type).toLowerCase().includes(searchTerm); 
  });

  if (this.searchText === '') { // Search is cleared
    this.sortBy(this.sortColumn); // Reapply sorting
  }
}


  beautifyType(type: string): string {
    const typeMap = {
      'MULTIPLE_CHOICE': 'Multiple Choice',
      'TRUE_FALSE': 'True Or False',
      'FILL_IN_THE_BLANK': 'Fill in the Blank',
      'MATCHING': 'Matching',
      'ESSAY': 'Essay',
    };
    return typeMap[type] || type; 
  }

  viewQuiz(quizId: number) {
    this.router.navigate(['/quizzes', quizId]); 
  }
  


  updateQuizProperty(quiz: Quiz, property: string) {
    quiz[`editable${property.charAt(0).toUpperCase() + property.slice(1)}`] = false; // Turn off edit mode

    // Make a copy to avoid change detection issues (optional)
    
    const updatedQuiz = { ...quiz };

    this.quizService.updateQuiz(quiz.id, updatedQuiz)
      .subscribe({
        next: (savedQuiz) => {
          // Update successful 
        },
        error: (err) => {
          console.error('Error updating quiz:', err);
          // Handle the error (e.g., revert the changes).
        }
      });
  }


  confirmDeleteQuiz(quizId: number) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.deleteQuiz(quizId);
    }
  }

  deleteQuiz(quizId: number) {
    this.quizService.deleteQuiz(quizId).subscribe({
      next: () => {
        // Successfully deleted: Update the UI immediately
        this.quizzes = this.quizzes.filter(quiz => quiz.id !== quizId); 
        this.filterQuizzes();
      },
      error: (err) => {
        console.error('Error deleting quiz:', err);
        // Handle the error (e.g., display an error message to the user)
      }
    });
  }




}
