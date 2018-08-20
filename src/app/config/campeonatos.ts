import { Injectable } from "@angular/core";

@Injectable()
export class Campeonatos {

    public static Campeonatos = [
 {
            ch_id: 24,
            ch_nome: "Brasileirão 2018",
            ch_logocampeonato: "https://upload.wikimedia.org/wikipedia/pt/e/e1/Brasileirao_Serie_A_2018.png"
        } ,
 {
            ch_id: 27,
            ch_nome: "Brasileirão Serie B",
            ch_logocampeonato: "http://www.ceroacero.es/img/logos/edicoes/104432_imgbank_.png"
        } ,
 {
            ch_id: 28,
            ch_nome: "Libertadores 2018",
            ch_logocampeonato: "https://1.bp.blogspot.com/-IvNqa0hX-ro/Wj0sbCu4PgI/AAAAAAABQlE/3tmNuTzm6DAfiboJMvr9Q2_YG2SkLtiLwCLcBGAs/s1600/Copa%2BCONMEBOL%2BLibertadores.png"
        } ,
 {
            ch_id: 29,
            ch_nome: "Copa Sul-Americana",
            ch_logocampeonato: "https://upload.wikimedia.org/wikipedia/pt/thumb/e/e4/Conmebol_Sudamericana_logo.png/235px-Conmebol_Sudamericana_logo.png"
        } ,

        {
            ch_id: 30,
            ch_nome: "Futebol Espanhol",
            ch_logocampeonato: "https://pbs.twimg.com/profile_images/2174065038/lfp_400x400.png"
        } ,

         {
            ch_id: 31,
            ch_nome: "Premier League",
            ch_logocampeonato: "https://4.bp.blogspot.com/-mBWayBRdX5U/WYSwgcLVhwI/AAAAAAAAMes/vpJ-lddiEeIV1GmPEBO22lxS2idfFpnPwCLcBGAs/s1600/Premier%2BLeague.png"
        } ,

         {
            ch_id: 32,
            ch_nome: "Campeonato Italiano",
            ch_logocampeonato: "https://esquemasportivo.files.wordpress.com/2015/09/l5496-lega-calcio-serie-a-tim-current-8211-2010-logo-28601.png"
        } ,
        {
            ch_id: 33,
            ch_nome: "Superliga Argentina",
            ch_logocampeonato: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Superliga_Argentina_Logo.png"
        }];
        public static BACKEND_ADMIN = "http://www.dymenstein.com/public/admin";
        public static ASSETS_EQUIPOS = "/assets/equipos/grande";
        public static URL_BOLAO = "http://www.bolaocraquedebola.com.br";

    }

