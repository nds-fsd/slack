<h1>Skuadlack</h1>
Skuadlack es una aplicación web de chat en tiempo real desarrollada como parte del bootcamp en Nuclio Digital School. La aplicación se construyó con las siguientes tecnologías:

<ul>
<li>React (Front-end)</li>
<li>Express (Back-end)</li>
<li>MongoDB (Base de datos)</li>
<li>Socket.io (Comunicación en tiempo real)</li>
<li>JWT (Autenticación y autorización)</li>
  </ul>

<h3>Funcionalidades</h3>
Skuadlack es una aplicación de chat en tiempo real que permite a los usuarios comunicarse a través de diferentes canales de chat. Las principales características de la aplicación son:

<ul>
<li>Registro y inicio de sesión de usuarios</li>
<li>Creación de organizaciones</li>
<li>Comunicación en tiempo real a través de sockets</li>
<li>Envío de mensajes de texto y múltiples imágenes</li>
<li>Notificaciones en tiempo real</li>
</ul>
<h2>Requisitos previos</h2>
Para ejecutar Skuadlack en tu máquina local, debes tener instalado lo siguiente:

<ul>
	<li>Node.js</li>
  <li>MongoDB</li>
</ul>
  
<h2>Configuración</h2>

<ol>
	<li>Clona este repositorio en tu máquina local:</li>
	<pre><code>git clone https://github.com/nds-fsd/slack.git</code></pre>
	<li>Navega a Frontend y Backend del proyecto:</li>
	<pre><code>cd Frontend</code></pre>
  <pre><code>cd Backend</code></pre>
	<li>Instala las dependencias:</li>
	<pre><code>npm install</code></pre>
	<li>Crea un archivo <code>.env</code> en la raíz del directorio del servidor y agrega las siguientes variables de entorno:</li>
	<pre>
  <code>
  PORT=3001
  TEST_PORT=3002
  MAILGUN_KEY= 3f86ea7d225b0e397af7e946978cc7b0-ca9eeb88-ae4cd758
  MONGO_URL = mongodb+srv://SkuadLack:tOBlTJq3tFofFwPa@skuadlack.zvlzpow.mongodb.net/?retryWrites=true&w=majority
  JWT_SECRET = 'caracol'
  </code>
  </pre>
	<li>Inicia el servidor(Backend):</li>
	<pre><code>npm start</code></pre>
	<li>Abre una nueva terminal y navega al directorio del cliente(Frontend):</li>
	<li>Inicia el cliente:</li>
	<pre><code>npm start</code></pre>
	<li>Abre tu navegador web y navega a <code>http://localhost:3000</code> para ver la aplicación.</li>
</ol>

<h2>Contacto</h2>
Si tienes alguna pregunta o sugerencia sobre Skuadlack, por favor contáctanos a través de <b>admin@skuadlack.com</b>
