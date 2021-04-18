import React, { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFileWord, FaFilePowerpoint, FaFileExcel, FaFileImage, FaFilePdf, FaFileVideo, FaFile } from 'react-icons/fa'
import { AiOutlineCloseCircle, AiOutlineArrowLeft } from 'react-icons/ai'

import '../styles/pages/CreateCard.css'

interface SelectedFiles{
    name: string,
    url: string,
    extension: string
}

function CreateCard () {
  const [files, setFiles] = useState<File[]>([])
  const [selectedFiles, setSelectedFiles] = useState<SelectedFiles[]>([])

  function handleSelectedFiles (event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return
    }
    const selectedFiles = Array.from(event.target.files)

    event.target.value = ''

    setFiles(selectedFiles)

    const selectedFilesPreview = selectedFiles.map(file => {
      const fileExtension = file.name.substring(file.name.indexOf('.'), file.name.length)
      return { name: file.name, url: URL.createObjectURL(file), extension: fileExtension }
    })

    setSelectedFiles(selectedFilesPreview)
  }

  function handleRemoveFile (file: SelectedFiles) {
    setSelectedFiles(
      selectedFiles.map((file) => file).filter((item) => item.url !== file.url)
    )
    setFiles(
      files.map((files) => files).filter((item) => item.name !== file.name)
    )
  }

  return (
    <div className="form-card">
      <div className="create-card-title">
        <Link to="/Kanban"><AiOutlineArrowLeft color="#FF6C01" size={36}/></Link>
        <h1>Criar nova tarefa</h1>
      </div>
      <form className="create-card">
        <label className="label-card">Nome da tarefa:</label>
        <input className="input-card" type="text" name="nome-tarefa" required></input>
        <label className="label-card">Data de entraga:</label>
        <input className="input-card" type="date" name="data-entrega" required></input>
        <label className="label-card">Descrição:</label>
        <textarea className="input-card"
          name="descricao"
          rows={12}
          cols={2} ></textarea>
        <label className="label-card">Marcos:</label>
        <input className="input-card" ></input>
        <label className="label-card">Arquivos:</label>
        <div className="add-file">
          <label htmlFor="input-files" className="file-select">Selecione um arquivo</label>
          <input className="input-card"
            id="input-files"
            type="file"
            name="Arquivos"
            onChange={event => handleSelectedFiles(event)}
            multiple></input>
          <div className="files">
            {selectedFiles.map((file, index) => {
              return (
                <div key={index} className="file">
                  <span className="delete-file-button" onClick={() => handleRemoveFile(file)}><AiOutlineCloseCircle size={22} color="#FF6C01"/></span>
                  {file.extension === '.docx' || file.extension === '.doc' || file.extension === '.odt'
                    ? <FaFileWord size={26} color='#005197'/>
                    : file.extension === '.ppt' || file.extension === '.pps' || file.extension === '.pptx'
                      ? <FaFilePowerpoint size={26} color="#d04423"/>
                      : file.extension === '.xls' || file.extension === '.xlsx'
                        ? <FaFileExcel size={26} color="#1f6e43"/>
                        : file.extension === '.jpg' || file.extension === '.png' || file.extension === '.jfif'
                          ? <FaFileImage size={26} color="#f3e70c"/>
                          : file.extension === '.pdf' || file.extension === '.PDF'
                            ? <FaFilePdf size={26} color="#e10c0c"/>
                            : file.extension === '.mp4'
                              ? <FaFileVideo size={26} color="#a45ae1"/>
                              : <FaFile size={26} color="#fff"/>
                  }
                  <h5 className="file-name">{file.name}</h5>
                </div>
              )
            }
            )}
          </div>
          <button className="create-button">Criar tarefa</button>
        </div>
      </form>
    </div>
  )
}

export default CreateCard
