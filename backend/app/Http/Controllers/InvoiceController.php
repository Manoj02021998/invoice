<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use File;
use Validator;
use Exception;
use Illuminate\Http\Request;
use PDF;

class InvoiceController extends Controller
{
    public function addInvoice(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'invoice_number' => 'required|numeric|not_in:0|unique:invoices',
                'party_name' => 'required|string|min:2',
                'rate' => 'required|numeric|not_in:0',
                'tax' => 'required|numeric',
                'total' => 'required'
            ]);
    
            if ($validator->fails()) {
                $response = ['type' => 'Error', 'reason' => $validator->errors()->all()];
                return response()->json($response);
            }

            extract($request->input());
            if ($this->checkDate($invoice_date, $invoice_number) === true) {
                $user = auth()->user();
                $invoice = Invoice::create([
                    'user_id' => $user->id,
                    'invoice_number' => $request->invoice_number,
                    'invoice_date' => $request->invoice_date,
                    'party_name' => $request->party_name,
                    'pan'=> $request->pan,
                    'rate'=> $request->rate,
                    'tax'=> $request->tax,
                    'total'=> $request->total
                    
                ]);
    
                return response()->json([
                'type' => 'Success',
                'reason' => 'Invoice added successfully'
            ], 201);
            }else{
                return $this->checkDate($invoice_date, $invoice_number);
            }
        } catch (Exception $e) {
            return response()->json(['type' => 'Error', 'reason' => $e->getMessage()]);
        }
    }

    public function checkDate($date, $invoice_number){
        $recordExist = Invoice::get();
        if($recordExist->count() > 0){
            if($recordExist->count() == 1){
                if($recordExist[0]['invoice_number'] < $invoice_number){
                    if(strtotime($date) < strtotime($recordExist[0]['invoice_date'])){
                        return response()->json(['type' => 'Error', 'reason' => 'Date provided should be after or equal to previous invoice date!']);
                    }
                }
            }else{
                $smallerInvoice = Invoice::where('invoice_number', '<', $invoice_number)
                                                ->select(
                                                    'invoice_number', 
                                                    'invoice_date'
                                                )
                                                ->orderBy('invoice_number', 'desc')
                                                ->limit(1)
                                                ->first();
                if($smallerInvoice){
                    if(strtotime($date) < strtotime($smallerInvoice['invoice_date'])){
                        return response()->json(['type' => 'Error', 'reason' => 'Date provided should be after or equal to previous invoice date!']);
                    }
                }

                $greaterInvoice = Invoice::where('invoice_number', '>', $invoice_number)
                                                ->select(
                                                    'invoice_number', 
                                                    'invoice_date'
                                                )
                                                ->orderBy('invoice_number')
                                                ->limit(1)
                                                ->first();
                if($greaterInvoice){
                    if(strtotime($date) > strtotime($greaterInvoice['invoice_date'])){
                        return response()->json(['type' => 'Error', 'reason' => 'Date provided should be before or equal to next invoice date!']);
                    }
                }
            }
            return true;
        }else{
            return true;
        }
    }

    public function getInvoices(){
        try {
            $user = auth()->user();

            $invoices = Invoice::where('user_id', $user->id)
            ->orderBy('invoice_number')
            ->get();

            return response()->json(['type' => 'Success', 'invoices' => $invoices]);

        } catch (Exception $e) {
            return response()->json(['type' => 'Error', 'reason' => $e->getMessage()]);
        }
    }

    public function downloadInvoicePDF($id) {
        $invoice = Invoice::where('id', $id)->first();
        
        $pdf = app('dompdf.wrapper');
        $pdf->setPaper('A4', 'landscape');
        $pdf->loadView('pdf.invoice-pdf', compact('invoice'));
        
        $fileName = 'Invoice_' . $id . '.pdf';
        $sub_path = 'files/invoices';
        $destination_path = public_path($sub_path);

        $pdf->save($destination_path . '/' . $fileName);

        $sub_path = 'files/invoices/' . $fileName;
        $file = File::get(public_path($sub_path));

        return $file;
}

}
