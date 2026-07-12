(() => {
  const datasets = {
    7: { visits: 326, people: 251, whatsapp: 28, phone: 7, conversion: '10,7 %', trend: '↑ 12 % respecto a los 7 días anteriores', labels: ['L','M','X','J','V','S','D'], chart: [31,44,39,58,52,47,55], contacts: [3,4,4,7,6,5,6], sources: [['Google',45],['WhatsApp',27],['Acceso directo',18],['Otras',10]], devices: [['Móvil',82],['Ordenador',13],['Tablet',5]], tariffs: [['Sesión individual',63],['Bono de 5 sesiones',24],['Bono de 10 sesiones',13]], peak: ['Jueves','18 % de las visitas','19:00–21:00'] },
    30: { visits: 1284, people: 936, whatsapp: 103, phone: 24, conversion: '9,9 %', trend: '↑ 18 % respecto al periodo anterior', labels: ['1','5','10','15','20','25','30'], chart: [112,151,137,204,191,229,260], contacts: [9,14,12,23,18,24,27], sources: [['Google',48],['WhatsApp',24],['Acceso directo',19],['Otras',9]], devices: [['Móvil',78],['Ordenador',16],['Tablet',6]], tariffs: [['Sesión individual',61],['Bono de 5 sesiones',26],['Bono de 10 sesiones',13]], peak: ['Martes','19 % de las visitas','19:00–21:00'] },
    90: { visits: 3472, people: 2518, whatsapp: 267, phone: 71, conversion: '9,7 %', trend: '↑ 23 % respecto al trimestre anterior', labels: ['Sem 1','Sem 3','Sem 5','Sem 7','Sem 9','Sem 11','Sem 13'], chart: [382,441,397,521,548,571,612], contacts: [37,42,39,51,54,56,59], sources: [['Google',51],['WhatsApp',22],['Acceso directo',18],['Otras',9]], devices: [['Móvil',80],['Ordenador',15],['Tablet',5]], tariffs: [['Sesión individual',59],['Bono de 5 sesiones',28],['Bono de 10 sesiones',13]], peak: ['Miércoles','18 % de las visitas','18:00–21:00'] }
  };
  const format = new Intl.NumberFormat('es-ES');
  const setText = (selector, value) => document.querySelectorAll(selector).forEach((node) => { node.textContent = value; });
  const points = (values, max, width = 720, height = 230) => values.map((value, index) => `${(index * width) / (values.length - 1)},${height - (value / max) * (height - 25)}`).join(' ');
  const renderChart = (data) => {
    const svg = document.getElementById('activity-chart');
    const max = Math.max(...data.chart) * 1.12;
    const visitPoints = points(data.chart, max);
    const contactScale = data.contacts.map((value) => value * (Math.max(...data.chart) / Math.max(...data.contacts)) * .75);
    const contactPoints = points(contactScale, max);
    const end = visitPoints.split(' ').at(-1);
    svg.innerHTML = `<path class="chart-grid" d="M0 35H720M0 95H720M0 155H720M0 215H720"/><polygon class="chart-area" points="0,230 ${visitPoints} 720,230"/><polyline class="chart-visits" points="${visitPoints}"/><polyline class="chart-contacts" points="${contactPoints}"/><circle class="chart-point" fill="#0d2b64" cx="${end.split(',')[0]}" cy="${end.split(',')[1]}" r="6"/>`;
    document.getElementById('chart-labels').innerHTML = data.labels.map((label) => `<span>${label}</span>`).join('');
  };
  const renderBars = (target, items, className) => {
    document.getElementById(target).innerHTML = items.map(([label, value]) => `<div class="${className}"><div><span>${label}</span><strong>${value} %</strong></div><div class="microbar"><i style="width:${value}%"></i></div></div>`).join('');
  };
  const render = (period) => {
    const data = datasets[period];
    const contacts = data.whatsapp + data.phone;
    setText('[data-kpi="visits"]', format.format(data.visits));
    setText('[data-kpi="people"]', format.format(data.people));
    setText('[data-kpi="contacts"]', format.format(contacts));
    setText('[data-kpi="conversion"]', data.conversion);
    setText('[data-trend="visits"]', data.trend);
    setText('[data-trend="contacts"]', `${data.whatsapp} WhatsApp · ${data.phone} llamadas`);
    setText('[data-action="whatsapp"]', data.whatsapp);
    setText('[data-action="phone"]', data.phone);
    document.querySelector('[data-bar="whatsapp"]').style.width = `${(data.whatsapp / contacts) * 100}%`;
    document.querySelector('[data-bar="phone"]').style.width = `${(data.phone / contacts) * 100}%`;
    setText('[data-device-total]', format.format(data.people));
    setText('[data-peak="day"]', data.peak[0]);
    setText('[data-peak="dayDetail"]', data.peak[1]);
    setText('[data-peak="hour"]', data.peak[2]);
    renderChart(data);
    renderBars('source-list', data.sources, 'source-item');
    renderBars('tariff-list', data.tariffs, 'rank-item');
    const colors = ['#0d2b64','#22b9bd','#ccd7df'];
    document.getElementById('device-list').innerHTML = data.devices.map(([label, value], index) => `<div class="device-item"><i style="background:${colors[index]}"></i><div><span>${label}</span><strong>${value} %</strong></div></div>`).join('');
    const mobile = data.devices[0][1], desktop = data.devices[1][1];
    document.getElementById('device-donut').style.background = `conic-gradient(${colors[0]} 0 ${mobile}%,${colors[1]} ${mobile}% ${mobile + desktop}%,${colors[2]} ${mobile + desktop}%)`;
  };
  const period = document.getElementById('period');
  period.addEventListener('change', () => render(period.value));
  document.getElementById('export-csv').addEventListener('click', () => {
    const data = datasets[period.value];
    const rows = [['Métrica','Valor'],['Periodo',`${period.value} días`],['Visitas',data.visits],['Personas',data.people],['Clics en WhatsApp',data.whatsapp],['Clics en teléfono',data.phone],['Conversión',data.conversion],['Aviso','Datos de demostración']];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"','""')}"`).join(';')).join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8' }));
    link.download = `resumen-patricia-${period.value}-dias-demo.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  });
  render(period.value);
})();
