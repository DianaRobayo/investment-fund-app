# App de fondos de inversión

## 📋 Tabla de Contenidos
- Descripción
- Tecnologías
- Requisitos Previos
- Instalación
- Estructura del Proyecto

## 🚀 Descripción

La aplicación esta construida en Angular v20, teniendo como funcionalidad agregar y eliminar fondos de inversión relacionadas al usuario.

## 🛠️ Tecnologías
- Angular
- Angular Material
- Tailwind CSS
- Json server
- Sweetalert2

## 📦 Requisitos Previos (Modificar cada vez que se realice una actualización)
- Node.js >= v24.14.1
- npm >= 11.11.0
- Angular CLI >= 20.3.22

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/DianaRobayo/investment-fund-app.git
cd investment-fund-app
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Compilar proyecto
```bash
# Servidor de desarrollo (puerto 4200)
npm run start
# o
ng serve -o
```

### 4. Ejecutar json-server
Se debe ejecutar simultaneamente a la compilación del proyecto el siguiente comando
```bash
npx json-server --watch db.json
```

## 🗂️ Estructura del Proyecto

```text
investment-fund-app/
├── .angular/
├── .vscode/
├── public/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── services/
│   │   │       ├── fund-data-service.ts
│   │   │       ├── funds-service.ts
│   │   │       ├── history-fund-service.ts
│   │   │       ├── list-fund-service.ts
│   │   │       └── user-service.ts
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   ├── historial-funds/
│   │   │   ├── investment-funds/
│   │   │   └── profile/
│   │   ├── layout/
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   └── navbar/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── buttons/
│   │   │   │   ├── modal-fund/
│   │   │   │   └── table-general/
│   │   │   └── models/
│   │   │       ├── fund.ts
│   │   │       ├── historyFund.ts
│   │   │       ├── listFunds.ts
│   │   │       ├── relationUserFund.ts
│   │   │       └── users.ts
│   │   ├── app.config.server.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.server.ts
│   │   ├── app.routes.ts
│   │   └── app.ts
│   ├── index.html
│   ├── main.ts
│   ├── main.server.ts
│   └── server.ts
├── angular.json
├── db.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```