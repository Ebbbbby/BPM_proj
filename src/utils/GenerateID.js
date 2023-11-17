export const GenerateID = (start) => {
  const date = new Date();
  const id =
    start +
    date.getMonth().toString() +
    date.getDay().toString() +
    date.getHours().toString() +
    date.getMinutes().toString() +
    date.getSeconds().toString() +
    date.getMilliseconds().toString();
    
    
    
     

  return id;
};
