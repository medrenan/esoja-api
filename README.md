## Configurar
- Desinstalar postgres da maquina se tiver um
- `docker-compose up`
- `npx prisma migrate dev`

## Rodar
- Ter certeza que os containers tão rodando
- npm run serve

### Comentario adicional
Se tiver tendo problemas ainda adicionar token no Bearer token para autenticar.

Se tiver desesperado descomentar a linha 10 do arquivo:
\esoja-api\src\providers\middleware\ensure.authenticated.middleware.ts

### Exemplo de chamada endpoint

`curl --request POST \
  --url http://localhost:3333/user \
  --header 'Content-Type: application/json' \
  --data '{
	"email":"teste@gmail.com",
	"password":"vinipepino",
	"name":"vininho",
	"passwordConfirmation":"vinipepino"
}'`

url total: POST http://localhost:3333/user