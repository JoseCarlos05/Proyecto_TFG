export interface Gasto {
  id: number
  concepto: string
  total: number
  cantidadPagada: number
  pagados: number[]
  idComunidad: number
}
