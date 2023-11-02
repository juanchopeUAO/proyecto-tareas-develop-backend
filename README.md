<h1 align="center">Task Project - Backend</h1>

Proyecto Backend "Task Project" de la asignatura de Proyecto Informático.

## 💻 Herramientas Necesarias
Asegurate de tener instalado:
- VisualStudio2022
- Sql Server Express
- Postman
## Configuracion
Abre el archivo appsettings.json en el proyecto y asegúrate de que la cadena de conexión a la base de datos sea correcta.
```sh
"ConnectionStrings": {
    "Connection": "Data Source=Cadena de conexion;Initial Catalog=Task_Database;Integrated Security=True; TrustServerCertificate=True"
  },
}
```
la cadena de conexion se encuetra al momento de conectarte al sqlserver en la parte server name, se copia ese nombre y 
se pega en Source="la cadena de conexion"

Importar Database
1. ingresar a SqlServer
2. Se contecta a SqlServer (el por defecto)
3. te paras sobre la carpeta DATABASES y undes click derecho
4. se selecciona import Data-tier Application
5. en import settings se busca donde este guardado el archivo, lo seleccionas
6. se pulsa next hasta terminar 
