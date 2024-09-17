export const mockFondos = {
  count: 9,
  pageIndex: 1,
  pageSize: 3,
  data: [
    {
      codFondo: 1,
      identificadorFondo: "Fondo A",
      tipoRescate: "Parcial",
      codigoInterfaz: "INTERFZ01",
    },
    {
      codFondo: 2,
      identificadorFondo: "Fondo B",
      tipoRescate: "Total",
      codigoInterfaz: "INTERFZ02",
    },
    {
      codFondo: 3,
      identificadorFondo: "Fondo C",
      tipoRescate: "Parcial",
      codigoInterfaz: "INTERFZ03",
    },
    {
      codFondo: 4,
      identificadorFondo: "Fondo D",
      tipoRescate: "Total",
      codigoInterfaz: "INTERFZ04",
    },
    {
      codFondo: 5,
      identificadorFondo: "Fondo E",
      tipoRescate: "Parcial",
      codigoInterfaz: "INTERFZ05",
    },
    {
      codFondo: 6,
      identificadorFondo: "Fondo F",
      tipoRescate: "Total",
      codigoInterfaz: "INTERFZ06",
    },
    {
      codFondo: 7,
      identificadorFondo: "Fondo G",
      tipoRescate: "Parcial",
      codigoInterfaz: "INTERFZ07",
    },
    {
      codFondo: 8,
      identificadorFondo: "Fondo H",
      tipoRescate: "Total",
      codigoInterfaz: "INTERFZ08",
    },
    {
      codFondo: 9,
      identificadorFondo: "Fondo I",
      tipoRescate: "Parcial",
      codigoInterfaz: "INTERFZ09",
    },
  ],
  pageCount: 1,
};

export const mockFiles = {
  count: 3,
  pageIndex: 1,
  pageSize: 10,
  data: [
    {
      codFondo: 1,
      files: [
        "BQAQQP.FK.ELECTRIN.FONDO8.F210423.E000001",
        "BQAQQP.FK.ELECTRIN.FONDO8.F210423.E000002",
        "BQAQQP.FK.ELECTRIN.FONDO8.F210423.E000003"
      ],
    },
    {
      codFondo: 2,
      files: [
        "BQAQQP.FK.ELECTRIN.FONDO8.F210424.E000001",
        "BQAQQP.FK.ELECTRIN.FONDO8.F210424.E000002"
      ],
    },
    {
      codFondo: 3,
      files: [
        "BQAQQP.FK.ELECTRIN.FONDO8.F210425.E000001"
      ],
    },
  ],
  pageCount: 1,
};

export const mockFileContent: { [key: string]: string } = {
  "BQAQQP.FK.ELECTRIN.FONDO8.F210423.E000001": `130500010912059940000033099208020210423                    MIN20003309920000001
300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`,

  "BQAQQP.FK.ELECTRIN.FONDO8.F210423.E000002": `130500010912059940000033099208020210424                    MIN20003309920000002
300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`,

  "BQAQQP.FK.ELECTRIN.FONDO8.F210423.E000003": `130500010912059940000033099208020210425                    MIN20003309920000003
300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`,
};
