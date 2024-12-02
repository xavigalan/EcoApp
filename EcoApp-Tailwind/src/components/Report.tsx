
const { emoticon, color } = getEmoticonAndColor(reportType);
{/* Formulario de reporte */}
<div className="form-container">
<h3>Selecciona el tipo de reporte</h3>
<form onSubmit={handleFormSubmit}>
  <div className="form-group">
    <label>Tipo de Reporte:</label>
    <select
      value={reportType}
      onChange={(e) => setReportType(e.target.value)}
      required
    >
      <option value="">Selecciona un tipo de reporte</option>
      <option value="poda">Poda de árboles</option>
      <option value="muebles">Recogida de Muebles</option>
      <option value="eventos">Avisar de Eventos</option>
      <option value="otros">Otros (Basura, Animales muertos, etc.)</option>
    </select>
  </div>

  {reportType && (
    <div className="report-emoticon" style={{ color }}>
      <span style={{ fontSize: '3rem' }}>{emoticon}</span>
      <p style={{ color }}>Este es tu reporte seleccionado: {reportType}</p>
    </div>
  )}

  {reportType && (
    <>
      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe el reporte"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="image">Imagen (opcional):</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        />
      </div>

      <button type="submit">Enviar Reporte</button>
    </>
  )}
</form>
</div>