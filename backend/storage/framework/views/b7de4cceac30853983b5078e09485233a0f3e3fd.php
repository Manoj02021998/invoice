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
        <td><?php echo e($invoice->invoice_number); ?></td>
    </tr>
    <tr>
        <th>Invoice Date</th>
        <td><?php echo e($invoice->invoice_date); ?></td>
    </tr>
    <tr>
        <th>Party Name</th>
        <td><?php echo e($invoice->party_name); ?></td>
    </tr>
    <tr>
        <th>PAN</th>
        <td><?php echo e($invoice->pan); ?></td>
    </tr>
    <tr>
        <th>Rate</th>
        <td><?php echo e($invoice->rate); ?></td>
    </tr>
    <tr>
        <th>Tax</th>
        <td><?php echo e($invoice->tax); ?></td>
    </tr>
    <tr>
        <th>Total</th>
        <td><?php echo e($invoice->total); ?></td>
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
</html><?php /**PATH C:\Users\91773\Desktop\all\angular1\invoice\backend\resources\views/pdf/invoice-pdf.blade.php ENDPATH**/ ?>