export interface IndexSummaryUI {
  location: string | undefined;
  summary: string;
  billed: number;
  insurance: number;
  insuranceActual: number;
  graphData: Array<Array<any>> | undefined;
  graphData2: Array<Array<any>> | undefined;
}
