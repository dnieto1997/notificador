
import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import soundFile from '../sounds/alert.mp3';
import soundFile2 from '../sounds/alerta2.mp3';
import { formatearCantidad2 } from "helpers/Index";


function Dashboard() {

  const [data, setData] = useState([]);
  const [lastData, setLastData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('https://toppaylatam.com/notificador/public/api/prueba/notificacion');
        const newData = await response.json();
        setData(newData);
        setLastData(newData);
        setIsLoading(false);

        if (JSON.stringify(newData) !== JSON.stringify(lastData)) {


          toast.success("Movimiento en Perú \n  Referencia: '" + newData[0].reference + " \n Cliente:" + newData[0].Aliado + "\nBanco:" + " " + newData[0].banco);



          console.log(newData[0].id)
          console.log(lastData[0].id)

          const audio = new Audio(soundFile2);
          const audio2 = new Audio(soundFile);

          if (newData[0].tipo_solicitud === "2") {

            audio.play();

            try {

              const res = await fetch('https://api103.hablame.co/api/sms/v3/send/priority', {
                method: 'POST',
                headers: {
                  account: "10025581",
                  apikey: 'T7kH3XcP6Ofgyj2a8lSVKJzXQsMhXL',
                  token: 'd304ac1317ca9e5ce1901cd641dbd2b4 ',
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                  toNumber: "573146528509",
                  sms: "Movimiento en Perú:" + " " + "Referencia: " + newData[0].reference + " " + "Aliado: " + " " + newData[0].Aliado,
                  flash: "0",
                  sc: "890202",
                  request_dlvr_rcpt: "0"

                }),
              });

              const res2 = await fetch('https://api103.hablame.co/api/sms/v3/send/priority', {
                method: 'POST',
                headers: {
                  account: "10025581",
                  apikey: 'T7kH3XcP6Ofgyj2a8lSVKJzXQsMhXL',
                  token: 'd304ac1317ca9e5ce1901cd641dbd2b4 ',
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  toNumber: "573178137744",
                  sms: "Movimiento en Perú:" + " " + "Referencia: " + newData[0].reference + " " + "Aliado: " + " " + newData[0].Aliado,
                  flash: "0",
                  sc: "890202",
                  request_dlvr_rcpt: "0"

                }),
              });

              const res3 = await fetch('https://api103.hablame.co/api/sms/v3/send/priority', {
                method: 'POST',
                headers: {
                  account: "10025581",
                  apikey: 'T7kH3XcP6Ofgyj2a8lSVKJzXQsMhXL',
                  token: 'd304ac1317ca9e5ce1901cd641dbd2b4 ',
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  toNumber: "573054431519",
                  sms: "Movimiento en Perú:" + " " + "Referencia: " + newData[0].reference + " " + "Aliado: " + " " + newData[0].Aliado,
                  flash: "0",
                  sc: "890202",
                  request_dlvr_rcpt: "0"

                }),
              });



              const resJson = await res.json();
              console.log(resJson);

            } catch (error) {
              console.error('Error al consumir la API de mensaje:', error);
            }

          } else {

            audio2.play();
            return
          }
        }




      } catch (error) {

        console.error('Error al consumir la API:', error);
      }


    };
    const interval = setInterval(fetchData, 9000);

    return () => {
      clearInterval(interval);
    };

  }, [lastData])





  if (isLoading) {

    return <div class="text-center">
      <button class="btn btn-primary" type="button" disabled style={{ marginTop: '10%' }}>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" ></span>
        <span class="visually-hidden">Loading...</span>
      </button>
    </div>

  }

  if (!data) {
    return <div>Error al cargar los datos.</div>;
  }



  return (
    <>

      <div className="content">

        <ToastContainer />

        <div >
          <table id="dtOrderExample" className="table table-striped table-bordered table-sm" width="100%" style={{ marginTop: '8%' }}>
            <thead style={{ textAlign: 'center' }}>
              <tr>

                <th class="th-sm">Tipo de solicitud

                </th>
                <th class="th-sm">Aliado

                </th>
                <th class="th-sm">Referencia

                </th>
                <th class="th-sm">Banco

                </th>

                <th class="th-sm">Amount

                </th>
                <th class="th-sm">Nombres

                </th>
                <th class="th-sm">Documento de identidad

                </th>

              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {data.map((item) => (
                <tr >

                  <td>{item.tipo_solicitud === "1" ? "Checkout Posible Pago" : "Envío Soporte de pago"}</td>
                  <td>{item.Aliado}</td>
                  <td>{item.reference}</td>
                  <td>{item.banco}</td>
                  <td>{formatearCantidad2(item.amount)}</td>
                  <td>{item.username}</td>
                  <td>{item.num_doc}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>




    </>
  );
}

export default Dashboard;
