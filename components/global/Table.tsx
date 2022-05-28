export type TableHeading = {
  key: string;
  label: string;
};

export type TableRow = {
  [key: string]: string | number;
};

type TableProps = {
  className?: string;
  data: {
    headings: TableHeading[];
    rows: Array<TableRow>;
  };
};

const renderHeadings = (headings: TableHeading[]) =>
  headings.map((heading) => <th key={heading.key}>{heading.label}</th>);

const renderRow = (headings: TableHeading[], row: TableRow) => {
  return headings.map((heading) => {
    const cellValue = row[heading.key];
    if (!cellValue) return;

    return <td key={`${heading.key}-${cellValue}`}>{cellValue}</td>;
  });
};

const renderRows = (headings: TableHeading[], rows: Array<TableRow>) => {
  return rows.map((row, index) => {
    return <tr key={index}>{renderRow(headings, row)}</tr>;
  });
};

const Table = ({
  className,
  data = { headings: [], rows: [] },
}: TableProps) => {
  const { headings, rows } = data;

  return (
    <table className={`table ${className ? className : ""}`}>
      <thead>
        <tr>{renderHeadings(headings)}</tr>
      </thead>
      <tbody>{renderRows(headings, rows)}</tbody>
      <style jsx global>{`
        .table {
          border-collapse: separate;
          text-indent: initial;
          border-spacing: 0;
          max-width: 28rem;
          width: 100%;
        }

        .table th,
        .table td {
          padding: 0.5rem;
          text-align: left;
        }

        .table thead {
          background-color: var(--primary);
          color: var(--white);
        }

        .table tbody tr:nth-of-type(even) {
          background-color: var(--background);
        }
      `}</style>
    </table>
  );
};

export default Table;
