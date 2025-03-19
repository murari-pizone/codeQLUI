export interface HomeCard {
    revenueCardData: CardDetails[];
    orderCardData: CardDetails[];
    operationCardData: CardDetails[];
    catalogueCardData: CardDetails[];
}

export interface CardDetails {
    icon: string;
    title: string;
    text: string;
}