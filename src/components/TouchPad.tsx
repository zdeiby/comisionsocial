import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IonList } from '@ionic/react';

function TouchPad() {
    const sigCanvas = useRef({});
    const [penColor, setPenColor] = useState('#000000'); // Usando un color inicial en formato hexadecimal
    const [imageURL, setImageURL] = useState(''); // Estado para almacenar la imagen de la firma

    // Limpia el canvas de la firma
    const clearCanvas = () => {
        sigCanvas.current.clear();
        setImageURL(''); // También limpia la imagen mostrada
    };

    // Guarda la imagen de la firma
    const saveSignature = () => {
        if (sigCanvas.current.isEmpty()) {
            alert('Por favor, firma antes de guardar.');
            return;
        }
        const image = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
        setImageURL(image); // Guarda la imagen de la firma en el estado
    };

    return (

        <div className='text-center shadow  bg-white rounded'>
            <div style={{ marginBottom: '10px' }}>
                <button className='btn btn-success btn-sm' onClick={saveSignature}>Cargar Firma</button>
                <button className='btn btn-danger btn-sm' onClick={clearCanvas} style={{ marginLeft: '5px' }}>Limpiar Firma</button>
                <label style={{ marginLeft: '10px', }}>
                    COLOR:
                    <input 
                        className='btn  btn-sm'
                        type="color"
                        value={penColor}
                        onChange={(e) => setPenColor(e.target.value)}
                    />
                </label>
            </div>
            <SignaturePad
                ref={sigCanvas}
                penColor={penColor}
                canvasProps={{
                    width: 500, // Asegúrate de que el canvas tenga un tamaño fijo o se adapte adecuadamente
                    height: 200,
                    className: 'sigCanvas',
                    style: { border: '1px solid #ccc' }
                }}
            />
            <hr />
            {imageURL && (
                <div style={{ marginTop: '10px', justifyContent:'center' }} className='d-flex center'>
                    <img src={imageURL} alt="Firma del usuario" style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
                </div>
            )}
            <div style={{ marginTop: '10px' }}>
                Aquí aparecerá la firma del usuario cargada.
            </div>
        </div>

    );
}

export default TouchPad;
