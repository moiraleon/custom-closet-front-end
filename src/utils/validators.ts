import heic2any from "heic2any";

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
  
  //Main Handler for Image conversion to base64
  export function handleFileInput(event: Event, tag:String){
  const file = event.target.files[0];
  const preview = document.getElementById("preview-"+tag);
  const approveAndContinue = document.getElementById("continue-"+tag);
  
  if (file) {
    if (file.type === "image/heic") {
      convertHEICtoJPEG(file, (jpegBlob) => {
        const reader = new FileReader();
        reader.onload = () => {
          preview.src = reader.result;
        };
        //Encode and display preview
        reader.readAsDataURL(jpegBlob);
        preview?.classList.remove('default-hidden')
        approveAndContinue?.classList.remove('default-hidden')
      });
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        preview.src = reader.result;
      };
      //Encode and display preview
      reader.readAsDataURL(file);
      preview?.classList.remove('default-hidden')
      approveAndContinue?.classList.remove('default-hidden')
    }
  }
}; 

//Support for HEIC Image type
export function convertHEICtoJPEG(heicFile:Blob, callback:any){
  const heicReader = new FileReader();
  heicReader.onload = (event) => {
    const arrayBuffer = event?.target?.result;
    heic2any({
      blob: new Blob([arrayBuffer], { type: "image/heic" }),
      toType: "image/jpeg",
      quality: 0.5, // Adjust JPEG quality as needed
    })
    .then((jpegBlob) => {
      callback(jpegBlob);
    })
    .catch((error) => {
      console.error("Error converting HEIC to JPEG:", error);
    });
  };
  heicReader.readAsArrayBuffer(heicFile);
};
