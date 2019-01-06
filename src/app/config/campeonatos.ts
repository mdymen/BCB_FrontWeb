import { Injectable } from "@angular/core";

@Injectable()
export class Campeonatos {

    public static Campeonatos = [
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
        },
        {
            ch_id: 34,
            ch_nome: "Campeonato Paulista 2019",
            ch_logocampeonato: "http://estaticos.maisbolao.com.br//Campeonato/fe918f1a-b013-48cc-94fc-f90370e17819_medium.png"
        }];
        public static BACKEND_ADMIN = "http://www.dymenstein.com/public/admin";
        public static ASSETS_EQUIPOS = "/assets/equipos/grande";
        public static URL_BOLAO = "http://www.bolaocraquedebola.com.br";

    }

