import  {createClient} from 'https://esm.sh/@supabase/supabase-js'



const supUrl = "https://nitgqljblcgqptfvwtcv.supabase.co";
const supKey = "sb_publishable_Cy6JHpHSVQqUsqAqDjsJiw_p4e_1HHR";



//intialize
const supabase = createClient(supUrl,supKey)

console.log(supabase);

export default supabase;
