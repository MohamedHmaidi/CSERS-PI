import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Observable } from 'rxjs';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-quiz-statistics',
  templateUrl: './quiz-statistics.component.html',
  styleUrls: ['./quiz-statistics.component.css']
})
export class QuizStatisticsComponent implements OnInit, AfterViewInit {
  mostPopularQuizType$: Observable<string>;
  totalQuizzesCount$: Observable<number>;
  averageQuizScore$: Observable<number>;

  @ViewChild('mostPopularChartCanvas') mostPopularChartCanvas: ElementRef;
  @ViewChild('totalQuizzesChartCanvas') totalQuizzesChartCanvas: ElementRef;
  @ViewChild('averageQuizScoreChartCanvas') averageQuizScoreChartCanvas: ElementRef;

  mostPopularChart: any;
  totalQuizzesChart: any;
  averageQuizScoreChart: any;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.mostPopularQuizType$ = this.quizService.getMostPopularQuizType();
    this.totalQuizzesCount$ = this.quizService.getTotalQuizzesCount();
    this.averageQuizScore$ = this.quizService.getAverageQuizScore();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createMostPopularChart();
      this.createTotalQuizzesChart();
      this.createAverageQuizScoreChart();
    });
  }

  createMostPopularChart(): void {
    this.mostPopularQuizType$.subscribe(data => {
      const quizTypes = ['MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_IN_THE_BLANK', 'MATCHING', 'ESSAY'];
      const quizTypeCount = {};
      quizTypes.forEach(type => {
        quizTypeCount[type] = data === type ? 1 : 0;
      });

      const chartData = {
        labels: quizTypes,
        datasets: [{
          label: 'Popularity',
          data: Object.values(quizTypeCount),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      };

      this.mostPopularChart = new Chart(this.mostPopularChartCanvas.nativeElement, {
        type: 'radar',
        data: chartData,
        options: {
          scale: {
            ticks: {
              beginAtZero: true,
              max: 1
            }
          },
          title: {
            display: true,
            text: 'Quiz Type Popularity Radar Chart'
          }
        }
      });
    });
  }


  createTotalQuizzesChart(): void {
    this.totalQuizzesCount$.subscribe(data => {
      if (this.totalQuizzesChartCanvas) {
        this.totalQuizzesChart = new Chart(this.totalQuizzesChartCanvas.nativeElement, {
          type: 'bar',
          data: {
            labels: ['Total Quizzes Count'],
            datasets: [{
              label: 'Total Quizzes Count',
              data: [data],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      } else {
        console.error('totalQuizzesChartCanvas is undefined');
      }
    });
  }

  createAverageQuizScoreChart(): void {
    this.averageQuizScore$.subscribe(data => {
      if (this.averageQuizScoreChartCanvas) {
        this.averageQuizScoreChart = new Chart(this.averageQuizScoreChartCanvas.nativeElement, {
          type: 'bar',
          data: {
            labels: ['Average Quiz Score'],
            datasets: [{
              label: 'Average Quiz Score',
              data: [data],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      } else {
        console.error('averageQuizScoreChartCanvas is undefined');
      }
    });
  }
}
