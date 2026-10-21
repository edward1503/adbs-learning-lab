import fs from 'node:fs';
const edits=[[
'Compare tree lookup paths with hash buckets. The tree is a two-level illustration over sorted data, with one page per leaf; it is not a B+ tree implementation with dynamic splits and merges.',
'Find keys between 17 and 42, then follow the highlighted root and leaves. These are index keys; a key or record identifier (RID) does not by itself supply other row columns. Fetching a data page is a separate step when those columns are absent. This two-level illustration has one page per leaf and no dynamic splits or merges.',
'So đường tìm trong cây với bucket hash. Cây minh họa hai tầng trên dữ liệu đã sắp, mỗi lá là một page; nó chưa cài đặt split và merge động của B+ tree.',
'Tìm các khóa từ 17 đến 42 rồi theo nút gốc và các lá được tô sáng. Đây là khóa trong chỉ mục; khóa hoặc mã định danh bản ghi (RID) chưa cung cấp những cột khác của dòng. Nếu chỉ mục thiếu các cột cần trả về, phải đọc trang dữ liệu riêng. Minh họa hai tầng này có mỗi lá trên một trang, chưa mô phỏng tách hay gộp nút động.'
],[
'Costs are measured in page I/Os, excluding output writes, CPU, caching, and skew. This is a cost model with explicit assumptions, not a real optimizer.',
'Compare how often each join reads the same pages. With B memory frames, block nested loop reserves one for the inner input and one for output, leaving B−2 for the outer block. The hash estimate also requires a build partition to fit in B−2 frames; real hash-table overhead and uneven keys can break that assumption. Costs count page reads/writes but exclude output writes, CPU and caching.',
'Chi phí đo bằng page I/O, không tính ghi output, CPU, cache và skew. Đây là mô hình chi phí với giả định tường minh, không phải optimizer thật.',
'So số lần mỗi cách nối đọc lại cùng trang. Với B khung bộ nhớ, nối vòng lặp lồng theo khối dành một khung cho đầu vào bên trong và một cho đầu ra, còn B−2 khung chứa khối bên ngoài. Ước lượng nối băm cũng yêu cầu phân vùng dùng để dựng bảng băm vừa B−2 khung; phần bộ nhớ phụ của bảng băm và khóa phân bố lệch có thể làm giả định sai. Chi phí đếm lượt đọc/ghi trang, chưa tính ghi kết quả, CPU và dữ liệu đã nằm trong bộ nhớ.'
],[
'Each number represents a page containing one key. This small model shows run generation and multiway merging. With B buffers, initial runs have up to B pages and each merge combines at most B−1 runs.',
'Each number represents one page holding one key. First load up to B pages, sort them in memory and write a sorted run. To merge runs, reserve one of the B memory frames for output; each of the other B−1 frames holds the next page from one input run. That is why a merge combines at most B−1 runs. Follow each pass to see the remaining run count.',
'Mỗi số đại diện một page chứa một khóa. Mô hình nhỏ minh họa tạo run và trộn nhiều đầu vào. Với B buffer, run ban đầu dài tối đa B page và mỗi lần trộn kết hợp tối đa B−1 run.',
'Mỗi số đại diện một trang chứa một khóa. Đầu tiên nạp tối đa B trang, sắp trong bộ nhớ rồi ghi thành một dãy đã sắp (run). Khi trộn các dãy, dành một trong B khung bộ nhớ cho đầu ra; mỗi khung trong B−1 khung còn lại giữ trang tiếp theo của một dãy đầu vào. Vì vậy mỗi lần trộn nhận tối đa B−1 dãy. Theo từng lượt để thấy còn bao nhiêu dãy chưa trộn xong.'
]];
for(const file of ['labs/systems.js','i18n.js']){
 let text=fs.readFileSync(file,'utf8');
 for(const [oldEn,newEn,oldVi,newVi]of edits){
  if(!text.includes(oldEn))throw Error('Missing original lab description: '+file);
  text=text.replaceAll(oldEn,newEn);
  if(file==='i18n.js'){if(!text.includes(oldVi))throw Error('Missing VI lab description');text=text.replaceAll(oldVi,newVi);}
 }
 fs.writeFileSync(file,text);
}
console.log('Updated index/sort/join instructions and corresponding VI dictionary; no algorithms changed.');
