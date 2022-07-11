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
        icon: "success",
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


export const loadGoogleMaps = (callback) => {
  const existingScript = document.getElementById('googleMaps');

  if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://maps.google.com/maps/api/js?key=AIzaSyBfD5TOL2Yv87EhYGwi8RTarw1kug4FKfc';
      script.id = 'googleMaps';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
          if (callback) callback();
      };
  }

  if (existingScript && callback) callback();
};

export const removeGoogleMaps = () => {
  const mapScript = document.getElementById('googleMaps');

  if (mapScript) {
      mapScript.parentNode.removeChild(mapScript);

      const head = document.getElementsByTagName('head')[0];
      const scripts = head.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
          let script = scripts[i];
          let src = script.src;

          if (src.startsWith('https://maps.google.com/maps')) {
              head.removeChild(script);
          }
      }
  }
};
              