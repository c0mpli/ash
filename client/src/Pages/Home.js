import './Home.css'
import React , {useState,useEffect} from 'react';

export function Home(){
    const [selectedFile,setSelectedFile]=useState();
    const [isSelected,setIsSelected]=useState(false);
    const [filePath, setFilePath] = useState()
    const [downloadURL, setDownloadURL] = useState()
    const [isFilePicked, setIsFilePicked] = useState(false);
    const maxAllowedSize = 10 * 1024 * 1024; //10mb

    const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      setIsSelected(true);
    };

    const handleSubmission = async() =>{
      if(selectedFile.size >= maxAllowedSize){console.log("bigger")}
      const formData = new FormData();
      formData.append('my_file',selectedFile)
      console.log(selectedFile)
      var res = await fetch('/upload_file', {
          method: 'POST',
          body: formData,
        }
      )
      res = await res.json()
      setFilePath = res.file_path
      setDownloadURL = res.file_path+selectedFile.name
      
      //fetch(`/download_file?file_path=${url}`)
    }

  return (
    <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
  )
}