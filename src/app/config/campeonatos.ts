import { Injectable } from "@angular/core";

@Injectable()
export class Campeonatos {

    public static Campeonatos = [
        {
            ch_id: 38,
            ch_nome: "Brasileirão Série A 2019",
            ch_logocampeonato: "https://upload.wikimedia.org/wikipedia/pt/4/42/Campeonato_Brasileiro_S%C3%A9rie_A_logo.png"
        },
        {
            ch_id: 43,
            ch_nome: "Brasileirão Série B 2019",
            ch_logocampeonato: "http://www.ogol.com.br/img/logos/edicoes/104432_imgbank_.png"
        },
        {
            ch_id: 46,
            ch_nome: "Futebol Espanhol 2018-19",
            ch_logocampeonato: "https://logodownload.org/wp-content/uploads/2018/05/laliga-logo.png"
        },
        {
            ch_id: 47,
            ch_nome: "Futebol Argentino 2018-19",
            ch_logocampeonato: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Superliga_Argentina_Logo.png"
        },
        {
            ch_id: 48,
            ch_nome: "Futebol Ingês 2018-19",
            ch_logocampeonato: "https://logodownload.org/wp-content/uploads/2016/03/Premier-League-logo-6.png"
        },
        {
            ch_id: 49,
            ch_nome: "Futebol Italiano 2018-19",
            ch_logocampeonato: "https://upload.wikimedia.org/wikipedia/commons/3/33/FIGC_Logo_2017.svg"
        },
        {
            ch_id: 50,
            ch_nome: "Futebol Portugues 2018-19",
            ch_logocampeonato: "https://upload.wikimedia.org/wikipedia/en/5/5f/Portuguese_Football_Federation.svg"
        }];
        public static BACKEND_ADMIN = "http://www.dymenstein.com/public/admin";
        public static ASSETS_EQUIPOS = "/assets/equipos/grande";
        public static URL_BOLAO = "http://www.bolaocraquedebola.com.br";

    }

