// validators.ts
export function validateEmail(email: string): boolean {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    ) !== null;
  }
  
  export function validate(event : Event) {
    const value = event?.target?.value;
  
    event?.target?.classList.remove('ion-valid');
    event?.target?.classList.remove('ion-invalid');
  
    if (value === '') return;
  
    validateEmail(value)
      ? event?.target?.classList.add('ion-valid')
      : event?.target?.classList.add('ion-invalid');
  }
  
  export function markTouched(event: Event) {
    event?.target?.classList.add('ion-touched');
  }
  