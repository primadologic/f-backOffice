import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { Button } from '@/components/ui/button';

interface ExportConfig {
  label: string;
  value: string;
  transform?: (value: any) => string;
}

interface TableExportProps {
  data: any[];
  filename?: string;
  columns: ExportConfig[];
}

const TableExport = ({ 
  data = [], 
  filename = 'table-export',
  columns 
}: TableExportProps) => {
  
  // Function to transform data according to column configurations
  const transformData = (data: any[]) => {
    return data.map(item => {
      const transformedRow: Record<string, any> = {};
      columns.forEach(({ label, value, transform }) => {
        // Get nested values using dot notation (e.g., "riskLevel.name")
        const rawValue = value.split('.').reduce((obj, key) => obj?.[key], item);
        transformedRow[label] = transform ? transform(rawValue) : rawValue;
      });
      return transformedRow;
    });
  };

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob(['\ufeff', content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleCSVExport = () => {
    try {
      if (!Array.isArray(data) || data.length === 0) {
        alert('No data available to export');
        return;
      }

      const transformedData = transformData(data);
      const headers = columns.map(col => col.label);
      
      const csvData = [
        headers.join(','),
        ...transformedData.map(row => 
          headers.map(header => {
            const cell = row[header]?.toString() ?? '';
            return cell.includes(',') ? `"${cell}"` : cell;
          }).join(',')
        )
      ].join('\n');

      downloadFile(csvData, `${filename}.csv`, 'text/csv;charset=utf-8;');
    } catch (error) {
      console.error('CSV Export failed:', error);
      alert('Failed to export CSV. Please try again.');
    }
  };

  const handleExcelExport = () => {
    try {
      if (!Array.isArray(data) || data.length === 0) {
        alert('No data available to export');
        return;
      }

      const transformedData = transformData(data);
      const headers = columns.map(col => col.label);
      
      let excelContent = '<table>';
      
      // Add headers
      excelContent += '<tr>';
      headers.forEach(header => {
        excelContent += `<th style="background-color: #f0f0f0; font-weight: bold;">${header}</th>`;
      });
      excelContent += '</tr>';
      
      // Add data
      transformedData.forEach(row => {
        excelContent += '<tr>';
        headers.forEach(header => {
          const cell = row[header]?.toString() ?? '';
          excelContent += `<td>${cell}</td>`;
        });
        excelContent += '</tr>';
      });
      
      excelContent += '</table>';

      const template = `
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f0f0f0; }
            </style>
          </head>
          <body>
            ${excelContent}
          </body>
        </html>
      `;

      downloadFile(template, `${filename}.xls`, 'application/vnd.ms-excel');
    } catch (error) {
      console.error('Excel Export failed:', error);
      alert('Failed to export Excel. Please try again.');
    }
  };

  const handleJSONExport = () => {
    try {
      if (!Array.isArray(data) || data.length === 0) {
        alert('No data available to export');
        return;
      }

      const transformedData = transformData(data);
      const jsonContent = JSON.stringify(transformedData, null, 2);
      downloadFile(jsonContent, `${filename}.json`, 'application/json');
    } catch (error) {
      console.error('JSON Export failed:', error);
      alert('Failed to export JSON. Please try again.');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" ">
        {/* <CustomButton 
          size={'sm'}
          disabled={!Array.isArray(data) || data.length === 0}
          className="ring-1 !px-3  ring-btn-border-gray focus-visible:!outline-none bg-white transition-colors hover:ring-2 text-xs hover:ring-white focus-visible:ring-1 focus-visible::ring-gray-400  hover:bg-[#f39500] hover:text-white"
        >
           <Download className="mr-2 h-4 w-4" />
          <span className="mr-1">Export</span>
        </CustomButton>  */}
        <Button
          variant={'outline'}
          size={'sm'}
          disabled={!Array.isArray(data) || data.length === 0}
        >
          <Download className="mr-2 h-4 w-4" />
          <span className="mr-1">Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCSVExport}>
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExcelExport}>
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleJSONExport}>
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableExport;