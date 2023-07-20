import jsPDF from 'jspdf';
import 'jspdf-autotable';
const imprimirGuiaPdf =  (datosPdf , productos ,documento) => {
    const pdf = new jsPDF();

    let arrayProductos = [];

    productos.forEach(producto => {
        let itemArrayProductos = [
            producto.nombreProducto,
            producto.precioProducto,
            producto.cantidadProducto,
            producto.subTotalProducto
        ]
        arrayProductos.push(itemArrayProductos)
    });
    pdf.setFontSize(10);
    pdf.text(`Fecha  ${documento.FechaGuia}`, 170, 10);
    pdf.setFontSize(14);
    pdf.text(`Guia de Remisión  ${documento.Codigo}-${documento.Numero}`, 80, 10);
    pdf.text('Datos Envio',10,20)
    pdf.setFontSize(10);
    pdf.text(`Sucursal Origen: ${datosPdf.nombreSucOrigen}`,10,30)
    pdf.text(`Sucursal Destino: ${datosPdf.nombreSucDestino}`,85,30)
    pdf.text(`Fecha Salida: ${datosPdf.fechaSalida}`,10,40)
    pdf.text(`Fecha Llegada: ${datosPdf.fechaLlegada}`,85,40)
    pdf.setFontSize(14);
    pdf.text('Datos Conductor',10,50)
    pdf.setFontSize(10);
    pdf.text(`Nombre: ${datosPdf.nombreConductor}`,10,60)
    pdf.text(`Celular: ${datosPdf.celularConductor}`,85,60)
    pdf.text(`Placa Vehiculo: ${datosPdf.placaVehiculo}`,10,70)
    pdf.setFontSize(14);
    pdf.text('Detalle Envio',10,80)

    const opciones = {
        startY:90
      };
    pdf.autoTable({
        head: [['Nombre','Precio','Cantidad','SubTotal']], 
        body: arrayProductos, 
        startY: opciones.startY,
        margin: { top: 50 }, 
      });


    pdf.save(`GuiaRemision_${documento.Codigo}${documento.Numero}_${documento.FechaGuia}.pdf`);
} 

const imprimirBoletaPdf =  (datosPdf,productos,documento,Cupon) => {
    const pdf = new jsPDF();
    let ytable = 30;
    let arrayProductos = [];

    productos.forEach(producto => {
        let itemArrayProductos = [
            producto.nombreProducto,
            producto.precioProducto,
            producto.cantidadProducto,
            producto.subTotalProducto
        ]
        arrayProductos.push(itemArrayProductos)
    });
    pdf.setFontSize(10);
    pdf.text(`Fecha  ${documento.FechaBoleta}`, 170, 10);
    pdf.setFontSize(14);
    pdf.text(`Boleta  ${documento.Codigo}-${documento.Numero}`, 80, 10);
    console.log(Cupon)
    if(Object.keys(Cupon).length !== 0){
      pdf.text('Cupon',10,20)
      pdf.setFontSize(10);
      pdf.text(`Codigo: ${Cupon.Codigo}`,10,30)
      pdf.text(`Descuento: ${Cupon.PorcentajeDescuento}%`,85,30)
      pdf.setFontSize(14);
      pdf.text('Detalle Venta',10,40)
      ytable = 50
    }else{
      pdf.setFontSize(14);
      pdf.text('Detalle Venta',10,20)
    }
  
    const opciones = {
        startY:ytable
      };
    pdf.autoTable({
        head: [['Nombre','Precio','Cantidad','SubTotal']], 
        body: arrayProductos, 
        startY: opciones.startY,
        margin: { top: 50 }, 
      });


    pdf.save(`Boleta_${documento.Codigo}${documento.Numero}_${documento.FechaBoleta}.pdf`);
} 


export { imprimirGuiaPdf , imprimirBoletaPdf }