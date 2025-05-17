//Source : https://www.tutorialspoint.com/regex-in-reactjs

//Verifier que l'email suit le format suivant: lettre et nombre + @ + lettre seulement + . + minimum deux lettre apres le point  
export const validEmail = new RegExp(
   '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z]+\\..[a-zA-Z]{2,}$'
); 

/*Verifier que le mdp suit le format suivant: au moins une lettre minuscule, au moins une lettre majuscule, 
au moins un nombre, au moins un caractère spéciale, au moins 8 caracteres*/
export const validPassword = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?=.*[^a-zA-Z0-9]).{8,}$'
);

//Verifier nom contient juste des lettre
export const validName = new RegExp('^[A-Za-z]+$');

//verifier nombre contient juste des nombres
export const validPhoneNumber = new RegExp('^[0-9]+$');
