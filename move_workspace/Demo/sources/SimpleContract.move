// Module definition
module exampleAddress::SimpleContract {

   
    // A simple view function that returns a constant value (e.g., 42)
    #[view]
    public fun get_constant_value(): u64 {
        42  // This will return the constant value 42
    }
}
