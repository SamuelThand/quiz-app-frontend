import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { Location } from '@angular/common';
import { Quiz } from '../models/quiz.model';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css']
})
export class PlayQuizComponent implements OnInit {
  private backendService: BackendService;
  private activatedRoute: ActivatedRoute;
  private location: Location;
  protected quiz: Quiz | any;
  protected selectedOption: boolean[][] = [];
  protected isSuccessful: boolean = false;

  constructor(
    activatedRoute: ActivatedRoute,
    backendService: BackendService,
    location: Location
  ) {
    this.activatedRoute = activatedRoute;
    this.backendService = backendService;
    this.location = location;
  }

  ngOnInit(): void {
    this.quiz = {};
    this.initQuiz();
  }

  /**
   * Initializes quiz member from the BackendService
   */
  private initQuiz() {
    this.activatedRoute.queryParams.subscribe((param) => {
      this.backendService.getQuiz(param['id']).subscribe((quiz: Quiz) => {
        this.quiz = quiz;
        this.fillSelectedOption(quiz.questions.length);
      });
    });
  }

  /**
   * Fills the selectedOption array with 3 false values for each iteration.
   *
   * @param length length of iterations
   */
  fillSelectedOption(length: number): void {
    for (let i = 0; i < length; i++) {
      this.selectedOption[i] = [];
      for (let j = 0; j < 3; j++) {
        this.selectedOption[i][j] = false;
      }
    }
  }

  /**
   * Handler for the Back button.
   */
  onGoBack(): void {
    this.goBack();
  }

  /**
   * Go back to the previous page.
   */
  private goBack(): void {
    this.location.back();
  }

  /**
   * Handler for the option click event.
   *
   * @param event the event that triggered the function
   * @param outerIndex index outer array
   * @param innerIndex index inner array
   */
  protected onOptionClick(
    event: MouseEvent,
    outerIndex: number,
    innerIndex: number
  ) {
    if (this.isSuccessful) {
      return;
    }
    // Get the clicked option from the event
    if (event.target instanceof HTMLDivElement) {
      const clickedOption = event.target;
      // Get the input element
      const optionInput = clickedOption.querySelector(
        'input'
      ) as HTMLInputElement;
      // Set the input element to checked
      optionInput.checked = true;
    }
    this.toggleSelected(outerIndex, innerIndex);
  }

  /**
   * Toggles the selected option.
   *
   * @param outerIndex index outer array
   * @param innerIndex index inner array
   */
  private toggleSelected(outerIndex: number, innerIndex: number): void {
    this.selectedOption[outerIndex].fill(false);
    this.selectedOption[outerIndex][innerIndex] = true;
    console.log('Question number: ' + (outerIndex + 1));
    console.log(this.selectedOption[outerIndex]);
  }

  /**
   * Submits the form. This function is called when the submit button is clicked.
   */
  protected onSubmit(): void {
    this.submit();
  }

  /**
   * Increases the counter "played" of the quiz and updates the quiz in the database.
   */
  private submit(): void {
    this.isSuccessful = true;
    this.quiz.played = this.quiz.played ? this.quiz.played + 1 : 1;
    this.backendService
      .updateQuiz(this.quiz._id, this.quiz)
      .subscribe((quiz: Quiz) => {
        console.log(quiz);
      });
  }

  /**
   * Returns a string based on the option index.
   *
   * @param index index of the option
   * @returns a sting with the option label
   */
  protected getOptionLabel(index: number): string {
    const label = ['1.', 'X.', '2.'];
    return label[index];
  }
}
