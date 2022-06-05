<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
  <h3 style='text-align: center'>Invoice</h3>
    <table class="table table-bordered">
    <tr>
        <th>Invoice Number</th>
        <td>{{$invoice->invoice_number}}</td>
    </tr>
    <tr>
        <th>Invoice Date</th>
        <td>{{$invoice->invoice_date}}</td>
    </tr>
    <tr>
        <th>Party Name</th>
        <td>{{$invoice->party_name}}</td>
    </tr>
    <tr>
        <th>PAN</th>
        <td>{{$invoice->pan}}</td>
    </tr>
    <tr>
        <th>Rate</th>
        <td>{{$invoice->rate}}</td>
    </tr>
    <tr>
        <th>Tax</th>
        <td>{{$invoice->tax}}</td>
    </tr>
    <tr>
        <th>Total</th>
        <td>{{$invoice->total}}</td>
    </tr>
    </table>
    <style>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  
  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>
  </body>
</html>