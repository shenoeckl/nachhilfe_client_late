export class ErrorMessage {
  constructor(public forControl: string,
              public forValidator: string,
              public text: string)
  {

  }
}

export const OfferFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Titel muss angegeben werden!'),
  new ErrorMessage('title', 'maxlength', 'Ein Titel darf maximal 100 Zeichen lang sein!'),
  new ErrorMessage('title', 'minlength', 'Ein Titel muss mindestens 10 Zeichen lang sein!'),
  new ErrorMessage('description', 'maxlength', 'Eine Beschreibung darf maximal 200 Zeichen lang sein!'),
  new ErrorMessage('description', 'minlength', 'Eine Beschreibung muss mindestens 10 Zeichen lang sein!'),
  new ErrorMessage('subject', 'required', 'Es muss eine Lehrveranstaltung ausgewählt werden!'),
  new ErrorMessage('status', 'required', 'Es muss ein Status ausgewählt werden!'),
  new ErrorMessage('starttime', 'required', 'Es muss ein Datum/eine Uhrzeit ausgewählt werden!'),
  new ErrorMessage('endtime', 'required', 'Es muss ein Datum/eine Uhrzeit ausgewählt werden!'),
];
