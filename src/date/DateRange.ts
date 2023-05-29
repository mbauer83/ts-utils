export class DateRange {
    private readonly asMillisecondTimestamp: (dateOrMs: Date | number) => number;
    private readonly satisfiesLowerBound: (date: Date | number) => boolean;
    private readonly satisfiesUpperBound: (date: Date | number) => boolean;
    public static readonly empty = new DateRange();

    constructor(
        public readonly fromDate: Date | undefined = undefined,
        public readonly toDate: Date | undefined = undefined,
        public readonly lowerBoundIsInclusive: boolean = false,
        public readonly upperBoundIsInclusive: boolean = false,
    ) {
        if (fromDate !== undefined && toDate !== undefined) {
            const d1 = fromDate.getTime() + '';
            const d2 = toDate.getTime() + '';
            if (fromDate.getTime() > toDate.getTime()) {
                throw new Error(
                    'Error constructing DateRange: `fromDate` must not be after `toDate`. `fromDate` provided: ' +
                    d1 +
                    ', `toDate` provided: ' +
                    d2
                );
            }
        }

        this.asMillisecondTimestamp = (dateOrMs: Date | number) => (dateOrMs instanceof Date) ? dateOrMs.getTime() : dateOrMs;

        this.satisfiesLowerBound
            = (date: Date | number) => (this.fromDate === undefined)
                ? true
                : this.lowerBoundIsInclusive
                    ? this.asMillisecondTimestamp(date) >= this.fromDate.getTime()
                    : this.asMillisecondTimestamp(date) > this.fromDate.getTime();

        this.satisfiesUpperBound
            = (date: Date | number) => (this.toDate === undefined)
            ? true
            : this.upperBoundIsInclusive
                ? this.asMillisecondTimestamp(date) <= this.toDate.getTime()
                : this.asMillisecondTimestamp(date) < this.toDate.getTime();
    }

    hasLowerBound(): boolean {
        return this.fromDate !== undefined;
    }

    hasUpperBound(): boolean {
        return this.toDate !== undefined;
    }

    isInRange(dateOrMillisecondTimestamp: Date | number): boolean {
        return this.satisfiesLowerBound(dateOrMillisecondTimestamp)
            && this.satisfiesUpperBound(dateOrMillisecondTimestamp);
    }

    toString(): string {
        const lowerBoundDelimiter = this.lowerBoundIsInclusive ? '[' : '(';
        const lowerBoundPart = lowerBoundDelimiter + (this.hasLowerBound() ? this.fromDate!.toISOString() : '...') + ', ';
        const upperBoundDelimiter = this.upperBoundIsInclusive ? ']' : ')';
        const upperBoundPart = (this.hasUpperBound() ? this.toDate!.toISOString() : '...') + upperBoundDelimiter;
        return lowerBoundPart + upperBoundPart;
    }
}