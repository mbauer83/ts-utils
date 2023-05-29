export class DateRange {
    private readonly asMillisecondTimestamp: (dateOrMs: Date | number) => number;
    private readonly satisfiesLowerBound: (date: Date | number) => boolean;
    private readonly satisfiesUpperBound: (date: Date | number) => boolean;

    constructor(
        public readonly fromDate: Date | null,
        public readonly toDate: Date | null,
        public readonly lowerBoundIsInclusive: boolean = false,
        public readonly upperBoundIsInclusive: boolean = false,
    ) {
        if (fromDate !== null && toDate !== null) {
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
            = (date: Date | number) => (this.fromDate === null)
                ? true
                : this.lowerBoundIsInclusive
                    ? this.asMillisecondTimestamp(date) >= this.fromDate.getTime()
                    : this.asMillisecondTimestamp(date) > this.fromDate.getTime();

        this.satisfiesUpperBound
            = (date: Date | number) => (this.toDate === null)
            ? true
            : this.upperBoundIsInclusive
                ? this.asMillisecondTimestamp(date) <= this.toDate.getTime()
                : this.asMillisecondTimestamp(date) < this.toDate.getTime();
    }

    hasLowerBound(): boolean {
        return this.fromDate !== null;
    }

    hasUpperBound(): boolean {
        return this.toDate !== null;
    }

    isInRange(dateOrMillisecondTimestamp: Date | number): boolean {
        return this.satisfiesLowerBound(dateOrMillisecondTimestamp)
            && this.satisfiesUpperBound(dateOrMillisecondTimestamp);
    }

    toString(): string {
        const lowerBoundDelimiter = this.lowerBoundIsInclusive ? '[' : '(';
        const lowerBoundPart = lowerBoundDelimiter + (this.hasLowerBound() ? this.fromDate!.toString() : '...') + ', ';
        const upperBoundDelimiter = this.upperBoundIsInclusive ? ']' : ')';
        const upperBoundPart = (this.hasUpperBound() ? this.toDate!.toString() : '...') + upperBoundDelimiter;
        return lowerBoundPart + upperBoundPart;
    }
}