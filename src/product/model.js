import React from 'react';

//const Map = React.lazy(() => import('./map/MapAll'));
//const Report = React.lazy(() => import('./report/Report'));
const Permit = React.lazy(() => import('./permit/Permit'));
const Qouta = React.lazy(() => import('./qouta/Qouta'));


export const model =
  [
    {
      path: "permit",
      icon: 'cil-object-group',
      showButton: true,
      form: Permit,
      columns:
        [["ship_code-num", "Судно>>Номер"],
      
        ["val-val_spend-val_end-cnt", "Всего-Освоено-Остаток-Судосутки"],
        ]

    },

    {
      path: "quote",
      view: "ssd.v_quote",
      showButton: true,
      icon: 'cil-object-ungroup',
      form: Qouta,
      columns:
        [["dev_code-rayon_code-year", "Владелец-Район-(Год)"],
        ["fish_code", "Ресурс"],
        ["val-val_spend-val_end", "Всего-Освоено-Остаток"],
        ["permit-permit_not", "Распред.-Не распред."],
        ["permit_for_change-val_for_change", "На утв.-Не распред. после утв."],


        ],
    },

  ];



