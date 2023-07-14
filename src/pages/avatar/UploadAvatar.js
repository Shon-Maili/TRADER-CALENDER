import React from "react";
import Avatar from "react-avatar-edit";
import "./UploadAvatar.css";

export default function UploadAvatar() {
   const [src,setSrc] = React.useState(null)
   const [preview, setPreview] = React.useState(null)

   function onClose() {
    setPreview(null);
   }

   function onCrop(view) {
    setPreview(view);
   }

    return(
     <div>
        <Avatar 
        width={400}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        src={src}
        onBeforeFileLoad={() => {}}
        disableResize
        
        />
        
        {preview && <img src={preview} />}
     </div>

    )
}

