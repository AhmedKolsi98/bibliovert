import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputRowComponent } from 'app/common/input-row/input-row.component';
import { UserService } from 'app/user/user.service';
import { UserDTO } from 'app/user/user.model';
import { ErrorHandler } from 'app/common/error-handler.injectable';
import { updateForm } from 'app/common/utils';


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, InputRowComponent],
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {

  userService = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  errorHandler = inject(ErrorHandler);

  currentUserId?: number;

  editForm = new FormGroup({
    userId: new FormControl({ value: null, disabled: true }),
    firstName: new FormControl(null, [Validators.maxLength(255)]),
    lastName: new FormControl(null, [Validators.maxLength(255)]),
    email: new FormControl(null, [Validators.maxLength(255)]),
    password: new FormControl(null, [Validators.maxLength(255)]),
    address: new FormControl(null, [Validators.maxLength(255)]),
    phoneNumber: new FormControl(null, [Validators.maxLength(255)]),
    orderHistory: new FormControl(null, [Validators.maxLength(255)])
  }, { updateOn: 'submit' });

  getMessage(key: string, details?: any) {
    const messages: Record<string, string> = {
      updated: $localize`:@@user.update.success:User was updated successfully.`
    };
    return messages[key];
  }

  ngOnInit() {
    this.currentUserId = +this.route.snapshot.params['userId'];
    this.userService.getUser(this.currentUserId!)
        .subscribe({
          next: (data) => updateForm(this.editForm, data),
          error: (error) => this.errorHandler.handleServerError(error.error)
        });
  }

  handleSubmit() {
    window.scrollTo(0, 0);
    this.editForm.markAllAsTouched();
    if (!this.editForm.valid) {
      return;
    }
    const data = new UserDTO(this.editForm.value);
    this.userService.updateUser(this.currentUserId!, data)
        .subscribe({
          next: () => this.router.navigate(['/users'], {
            state: {
              msgSuccess: this.getMessage('updated')
            }
          }),
          error: (error) => this.errorHandler.handleServerError(error.error, this.editForm, this.getMessage)
        });
  }

}
