(()=>{let o=null;const s=async()=>{const t=new URLSearchParams(document.cookie.replaceAll("; ","&")),r=new URL(window.location.href),e=t.get("dtPC"),n=t.get("XSRF-TOKEN");if(e&&n)return fetch(`https://www1.royalbank.com/sgw5/api/transaction-presentation-service-v3/v3/search/pda/account/${o}`,{headers:{accept:"application/json, text/plain, */*","accept-language":"en-CA, en;q=0.8, fr-CA;q=0.7, fr;q=0.6","content-type":"application/json","x-dtpc":e,"x-xsrf-token":n},referrer:r.origin+r.pathname,referrerPolicy:"strict-origin-when-cross-origin",body:JSON.stringify({}),method:"POST",mode:"cors",credentials:"include"}).then(a=>a.json()).catch(a=>{throw a});throw new Error("Could not get x-dtpc or x-xsrf-token headers for fetch request.")},i=()=>{const t=d("https://www1.royalbank.com/sgw5/api/transaction-presentation-service-v3/v3/transactions/pda/account/");if(t){const r=t.name,e=new URL(r).pathname.split("/");o=e[e.length-1]}},d=t=>{const r=performance.getEntriesByType("resource");for(let e=0;e<r.length;e++){const n=r[e];if(n.name.includes(t))return n}},l=t=>{const r=Papa.unparse(t.transactionList.map(n=>({date:n.bookingDate,"description-1":n.description[0],"description-2":n.description[1],amount:n.amount,creditDebitIndicator:n.creditDebitIndicator,runningBalance:n.runningBalance}))),e=document.createElement("a");e.setAttribute("download","transactions.csv"),e.setAttribute("href",URL.createObjectURL(new Blob([r],{type:"text/csv"}))),e.style.display="none",document.body.appendChild(e),e.click(),e.remove()},p=async()=>{if(o=null,i(),o)try{const t=await s();l(t)}catch(t){throw t}else throw new Error("Could not find network request needed to get transactions. Please wait a few minutes and try again. If that does not work, please reload the page and try again.")},c=(t,r,e)=>(t.runScript&&p().then(()=>{e({success:!0})}).catch(n=>{e({error:n.toString()})}).finally(()=>{chrome.runtime.onMessage.removeListener(c)}),!0);chrome.runtime.onMessage.addListener(c)})();