import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content"


const MySwal = withReactContent(Swal)

export const fireError = ( message) => {
    MySwal.fire({
        icon: "error",
        title: "Error",
        text: message,
        background: "var(--surface-b)",
        iconColor: "tomato",
        color: "var(--text-color)",
        customClass:{
          confirmButton: 'p-button',
        },
        buttonsStyling: false
      });
}
export const fireInfo = ( message) => {
    MySwal.fire({
        icon: "Information",
        title: "Información",
        text: message,
        background: "var(--surface-b)",
        iconColor: "tomato",
        color: "var(--text-color)",
        customClass:{
          confirmButton: 'p-button',
        },
        buttonsStyling: false
      });
}

export const consoleLog = (element) => {
  if(process.env.NODE_ENV !== 'production'){
    return console.log(element)
  }
}