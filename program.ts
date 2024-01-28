import StartUP from "./startUP";

let port = process.env.PORT || '3050';

StartUP.app.listen(port, function(){
    console.log(`servidor executando na porta ${port}`);
});