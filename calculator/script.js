let string = "";
let buttons = document.querySelectorAll(".button");
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML == "=") {
      try{
      string = eval(string);
      document.querySelector("input").value = string;
      }
      catch(error){
        document.querySelector("input").value = 'error';
      }
      
    } else if (e.target.innerHTML == "AC") {
      try{string = "";
      document.querySelector("input").value = string;
      }
      catch(error){
        document.querySelector("input").value = 'error';
      }
    } else if (e.target.innerHTML == "DEL") {
      try{string = string.slice(0, -1);
      document.querySelector("input").value = string;
      }
      catch(error){
        document.querySelector("input").value = 'error';
      }
    } else if (e.target.innerHTML == "%") {
      try {
        string = (eval(string) / 100).toString();
      } catch (erroe){
        docment.quereySelector('input').value='erroe';
      }
      document.querySelector("input").value = string;
    } else {
      string = string + e.target.innerHTML;
      document.querySelector("input").value = string;
    }
  });
});

